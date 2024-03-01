// you can hack multiple servers by running this script but with different args/server names
// can also be multi threaded 

/** @param {NS} ns */
export async function main(ns) {
    // getting the server
    
    let target = ns.args[0];

    //opening ports then nuking them
    
    if (ns.fileExists('SQLInject.exe', 'home')) {
     ns.sqlinject(target);
    }
    if (ns.fileExists('HTTPWorm.exe', 'home')) {
      ns.httpworm(target); 
    }
    if (ns.fileExists('relaySMTP.exe', 'home')) {
      ns.relaysmtp(target);
    }
    if (ns.fileExists('BruteSSH.exe', 'home')) {
      ns.brutessh(target)
    }
    if (!ns.hasRootAccess(target)) {
      ns.nuke(target);
    }

    //making the threshholds to keep money high and security low
    
    let moneythresh = ns.getServerMaxMoney(target) * 0.75;
    let securitythresh = ns.getServerSecurityLevel(target) + 5;

    //main loop that does everything

    while (true) {
      if (ns.getServerMoneyAvailable(target) < moneythresh) {
        await ns.grow(target);
      }else if (ns.getServerSecurityLevel(target) < securitythresh) {
        await ns.hack(target);
      } else {
        await ns.weaken(target);
      }
    }
  }
