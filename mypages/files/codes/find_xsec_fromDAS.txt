import os
import subprocess
import argparse

def run_command(cmd, debug=False):
    print(f"Running command: {cmd}")
    result = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    full_output = result.stdout + result.stderr
    if debug:
        print('\n======== debugging: Full cmsRun output ========')
        print(full_output.strip())
        print('\n================================================\n')
    return full_output.strip()

def extract_xsec(output):
    for line in output.split("\n"):
        if "After matching: total cross section" in line:
            parts = line.split("=")
            parts = [p.strip() for p in parts]
            if len(parts) > 1: return parts[1]
    return "No cross-section found."

def process_dataset(dataset, debug=False):
    print(f"\n\033[33mProcessing: {dataset}\033[0m")

    ### Finding parent dataset
    parent_cmd = f"dasgoclient --query=\"parent dataset={dataset}\""
    parent_dataset = run_command(parent_cmd)
    if not parent_dataset:
        print(f"\033[31mError: No parent dataset found for {dataset}\033[0m")
        return
    print("Found parent dataset:", parent_dataset)

    ### Finding parent file
    file_cmd = f"dasgoclient --query=\"file dataset={parent_dataset}\" | head -n 1"
    miniAOD_file = run_command(file_cmd)
    if not miniAOD_file:
        print(f"\033[31mError: No MiniAOD file found for {parent_dataset}\033[0m")
        return
    print("Found MiniAOD file:", miniAOD_file)

    ### Running cmsRun
    print("\nThis might take a few seconds ...")
    cmsRun_cmd = f"cmsRun genXsec_cfg.py inputFiles=file:root://cms-xrd-global.cern.ch//{miniAOD_file}"
    cmsRun_output = run_command(cmsRun_cmd, debug)
    xsec_line = extract_xsec(cmsRun_output)
    print(f"\n\033[93m{xsec_line}\033[0m")

def check_voms_proxy():
    result = subprocess.run("voms-proxy-info --timeleft", shell=True, capture_output=True, text=True)
    time_left = result.stdout.strip()
    if result.returncode != 0 or not time_left.isdigit() or int(time_left) <= 0:
        print("\n\033[31m[WARNING] CMS VOMS proxy not found or expired! Please run the following.\033[0m")
        print("voms-proxy-init -voms cms\n")
        return False
    
    time_left = int(time_left)
    hours, remainder = divmod(time_left, 3600)
    minutes, seconds = divmod(remainder, 60)
    print(f"CMS VOMS proxy found. Time left: {hours} hours, {minutes} minutes, {seconds} seconds.")
    return True

def check_cmssw():
    cmssw_base = os.environ.get("CMSSW_BASE")
    if not cmssw_base:
        print("\n\033[31m[WARNING] No CMSSW environment detected! Please set up CMSSW before running.\033[0m\n")
        return False
    print(f"CMSSW environment detected: {cmssw_base}")
    return True

def main():

    if not check_cmssw() or not check_voms_proxy(): return
    if not os.path.exists("genXsec_cfg.py"):
        print("Downloading genXsec_cfg.py...")
        os.system("curl https://raw.githubusercontent.com/cms-sw/genproductions/master/Utilities/calculateXSectionAndFilterEfficiency/genXsec_cfg.py -o genXsec_cfg.py")
        print("genXsec_cfg.py downloaded successfully.")
    
    parser = argparse.ArgumentParser()
    parser.add_argument("--dataset", type=str, required=True, help="Dataset to process")
    parser.add_argument("--debug", action="store_true", help="Enable debug mode")
    args = parser.parse_args()

    process_dataset(args.dataset, args.debug)
    print('\nDone!\n')

if __name__ == "__main__": main()
