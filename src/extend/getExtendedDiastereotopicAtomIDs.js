'use strict';

var OCL = require('openchemlib');

module.exports = function getExtendedDiastereotopicAtomIDs() {
    var molecule = this.getCompactCopy();
    molecule.addImplicitHydrogens();
    // Temporary code ???
    molecule.ensureHelperArrays(OCL.Molecule.cHelperNeighbours);

    var diaIDs = molecule.getDiastereotopicAtomIDs();
    var newDiaIDs = [];

    for (var i = 0; i < diaIDs.length; i++) {
        var diaID = diaIDs[i];
        var newDiaID = {
            oclID: diaID,
            hydrogenOCLIDs: [],
            nbHydrogens: 0
        };
        for (var j = 0; j < molecule.getAllConnAtoms(i); j++) {
            var atom = molecule.getConnAtom(i, j);
            if (molecule.getAtomicNo(atom) === 1) {
                newDiaID.nbHydrogens++;
                if (newDiaID.hydrogenOCLIDs.indexOf(diaIDs[atom]) === -1) {
                    newDiaID.hydrogenOCLIDs.push(diaIDs[atom]);
                }
            }
        }

        newDiaIDs.push(newDiaID);
    }

    return newDiaIDs;
};
