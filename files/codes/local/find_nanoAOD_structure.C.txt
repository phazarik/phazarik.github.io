#include <TFile.h>
#include <TTree.h>
#include <TBranch.h>
#include <TLeaf.h>
#include <iostream>
#include <iomanip>

using namespace std;

int find_nanoAOD_structure(TString filename) {

    TFile *file = TFile::Open(filename);
    if (!file || file->IsZombie()) {
        cerr << "Error: cannot open the file." << endl;
        return 1;
    }

    TTree *tree = nullptr;
    file->GetObject("Events", tree);
    if (!tree) {
        cerr << "Error: cannot find the 'Events' tree." << endl;
        file->Close();
        return 1;
    }

    TObjArray *branches = tree->GetListOfBranches();
    cout << left << setw(50) << "\nBranch name" << setw(10) << " Type\n" << endl;

    // Looping over branches array:
    for (int i = 0; i < branches->GetEntries(); ++i) {
        TBranch *branch = (TBranch *)branches->At(i);
        TLeaf *leaf = branch->GetLeaf(branch->GetName());
        cout << left << setw(50) << branch->GetName() << " " << setw(10) << leaf->GetTypeName() << endl;
    }

    file->Close();
    delete file;
    return 0;
}
