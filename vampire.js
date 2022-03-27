class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (
      this.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal
    ) {
      return false;
    } else {
      return true;
    }
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }

    for (const child of this.offspring) {
      const theKid = child.vampireWithName(name);
      if (theKid) {
        return theKid;
      }
    }

    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let number = this.offspring.length;
    for (const child of this.offspring) {
      number += child.totalDescendents;
    }
    return number;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let headVamp = this.headVampire;
    return headVamp.totalVamps;
  }

  get headVampire() {
    let owner = this.creator;
    let head = this;
    while (owner) {
      head = this;
      owner = this.creator;
    }
    return head;
  }

  get totalVamps() {
    let vampArr = [];

    if (this.yearConverted > 1980) {
      vampArr.push(this);
    }

    for (const child of this.offspring) {
      vampArr = vampArr.concat(child.totalVamps);
    }

    return vampArr;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let x = this.numberOfVampiresFromOriginal;
    let y = vampire.numberOfVampiresFromOriginal;
    let vamp1Creator = this.creator;
    let vamp2Creator = vampire.creator;

    if (!vampire.creator || this.creator === vampire) {
      return vampire;
    }

    if (!this.creator || vampire === this || vampire.creator === this) {
      return this;
    }

    if (!this.isMoreSeniorThan(vampire)) {
      //vamp1 is younger than vamp 2 -> we should cycle up vamp 1's heritage until they are equi-distant

      let z = x - y;

      while (z > 0) {
        vamp1Creator = vamp1Creator.creator;
        z--;
      }

      while (vamp1Creator !== vamp2Creator) {
        if (vamp1Creator === vampire) {
          return vampire;
        } else {
          vamp1Creator = vamp1Creator.creator;
          vamp2Creator = vamp2Creator.creator;
        }
      }

      return vamp1Creator;
    } else {
      let z = y - x;

      while (z > 0) {
        vamp2Creator = vamp2Creator.creator;
        z--;
      }

      while (vamp1Creator !== vamp2Creator) {
        if (vamp2Creator === this) {
          return this;
        } else {
          vamp1Creator = vamp1Creator.creator;
          vamp2Creator = vamp2Creator.creator;
        }
      }

      return vamp1Creator;
    }
  }
}

module.exports = Vampire;
