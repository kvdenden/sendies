// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Script, console } from "forge-std/Script.sol";

import { IPoolAddressesProvider } from "aave-v3-core/contracts/interfaces/IPoolAddressesProvider.sol";

import { GhostVault } from "../src/GhostVault.sol";

contract Deploy is Script {
  function setUp() public { }

  function run() public {
    uint256 privateKey = vm.envUint("PRIVATE_KEY");

    address usdc = vm.envAddress("USDC");
    IPoolAddressesProvider addressProvider = IPoolAddressesProvider(vm.envAddress("POOL_ADDRESSES_PROVIDER"));

    vm.startBroadcast(privateKey);

    GhostVault vault = new GhostVault(usdc, "Ghost USDC", "gUSDC", vm.addr(privateKey), addressProvider);

    vm.stopBroadcast();

    console.log("GhostVault deployed at:", address(vault));
  }
}
