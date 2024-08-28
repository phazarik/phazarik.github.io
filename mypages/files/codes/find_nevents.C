#include <iostream>
#include <TSystem.h>
#include <vector>
#include <TFile.h>
#include <TTree.h>
#include <TBranch.h>
#include <TString.h>
using namespace std;

void DisplayText(TString text, int color){
  //ANSI COLOR CODE:
  //Black   = 30
  //Red     = 31
  //Green   = 32
  //Yellow  = 33
  //Blue    = 34
  //Magenta = 35
  //Cyan    = 36
  //White   = 37
  TString set_color = "\033["+to_string(color)+"m";
  cout<<set_color;
  cout<<text<<endl;
  cout<<"\033[0m"; //0=default
}

void find_nevents(TString _path, TString _samplename){
  
  TString path = _path;//"/home/work/alaha1/public/RunII_ULSamples/2016/TTW/postVFP/TTWToLNu";

  TSystem* sys = gSystem;

  if (sys->AccessPathName(path) == 0) { // if the path exists

    cout<<"-----------------"<<endl;
    cout<<" List of files :"<<endl;
    cout<<"-----------------"<<endl;
    
    //Listing all the filenames in the directory and putting those in a list of TStrings:
    TString commandOutput;
    sys->Exec(Form("ls -1 %s", path.Data())); // -1 option ensures one file per line
    commandOutput = sys->GetFromPipe(Form("ls -1 %s", path.Data()));
    vector<TString> filenames;
    TString token;
    Ssiz_t from = 0;
    while (commandOutput.Tokenize(token, from, "\n")) {
      filenames.push_back(token);
    }

    cout<<"\n\n\n-----------------"<<endl;
    cout<<"Counting events:"<<endl;
    cout<<"-----------------"<<endl;

    //Counters:
    int count = 0;
    int totalevt = 0;
    
    //Lopping over the files:
    for (const auto& filename : filenames) {
      if (filename.EndsWith(".root", TString::kIgnoreCase)){//has to be a root file

	count = count+1;
	TString fullpath = path+"/"+filename;

	//Opening the file:
	TFile *tfile = new TFile(fullpath, "READ");
	if(!tfile){
	  DisplayText("Error: not found : "+fullpath, 31);
	  continue;
	}
	else if(tfile->IsZombie()) {
	  DisplayText("Error: zombie : "+fullpath, 31);
	  continue;
	}

	//Opening the Event tree.
	TTree *ttree = (TTree *)tfile->Get("Events");
	TBranch *br = ttree->GetBranch("run");
	int nevt = br->GetEntries();
	totalevt = totalevt+nevt;

	tfile->Close();
	delete tfile;

	//Displaying the result on screen:
	if(count == 1) cout<<"\n\n\nFileName \t\t\t\t\tnEvents"<<endl;
	cout<<filename<<"\t"<<nevt<<endl;;
	//break;

      }
    }

    TString count_str = Form("%d", count);

    cout<<"\n\n--------------------------"<<endl;
    DisplayText("Done", 33);
    cout<<"Samplename  = "<<_samplename<<endl;
    cout<<"No of files = "<<count<<endl;
    cout<<"nEvtTotal   = "<<totalevt<<endl;
    cout<<"--------------------------\n"<<endl;
  }
  else cout << "Path does not exist." << endl;
}
