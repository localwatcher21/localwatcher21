/** @param {NS} ns */
export async function main(ns) {

    let target = ns.args[0];
  
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
  
    let moneythresh = ns.getServerMaxMoney(target) * 0.75;
    let securitythresh = ns.getServerSecurityLevel + 5;
    while (true) {
      if (ns.getServerMoneyAvailable > moneythresh) {
        await ns.grow(target);
      }else if (ns.getServerSecurityLevel < securitythresh) {
        await ns.hack(target);
      } else {
        await ns.weaken(target);
      }
    }
  }