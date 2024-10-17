#include "Pythia8/Pythia.h"
#include "Pythia8Plugins/HepMC3.h"
#include "HepMC3/WriterAscii.h"

using namespace Pythia8;

int main() {

  // Interface for conversion from Pythia8::Event to HepMC3
  HepMC3::Pythia8ToHepMC3 ToHepMC3;

  // Set up HepMC3 file for output
  std::shared_ptr<HepMC3::WriterAscii> ascii_io = std::make_shared<HepMC3::WriterAscii>("ppToZToLL_10.dat");

  Pythia pythia;
  pythia.readString("Beams:frameType = 4");
  pythia.readString("Beams:LHEF = /mnt/d/work/temp/mcgeneration/ppToZToLL/Events/testrun/unweighted_events.lhe");
  pythia.readString("HadronLevel:Hadronize = on");
  pythia.readString("Check:nErrList = 0");
  pythia.init();

  int NEvents = 10;

  for (int iEvent = 0; iEvent < NEvents; ++iEvent) {
    if (!pythia.next()) continue;

    // Create a HepMC3 GenEvent
    HepMC3::GenEvent hepmcevt(HepMC3::Units::GEV, HepMC3::Units::MM);

    // Fill the event from Pythia
    ToHepMC3.fill_next_event(pythia, hepmcevt);

    // Write the event to the file
    ascii_io->write_event(hepmcevt);
  }

  pythia.stat();

  return 0;
}
