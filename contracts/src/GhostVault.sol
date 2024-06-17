// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { ERC4626 } from "solmate/tokens/ERC4626.sol";
import { ERC20 } from "solmate/tokens/ERC20.sol";
import { Owned } from "solmate/auth/Owned.sol";
import { SafeTransferLib } from "solmate/utils/SafeTransferLib.sol";

import { IPoolAddressesProvider } from "aave-v3-core/contracts/interfaces/IPoolAddressesProvider.sol";
import { IPool } from "aave-v3-core/contracts/interfaces/IPool.sol";

contract GhostVault is ERC4626, Owned {
  using SafeTransferLib for ERC20;

  event ClaimYield(address indexed recipient, uint256 amount);

  IPool public immutable pool;
  ERC20 public immutable aToken;

  address public yieldRecipient;

  constructor(
    address _asset,
    string memory _name,
    string memory _symbol,
    address _owner,
    IPoolAddressesProvider addressProvider
  ) ERC4626(ERC20(_asset), _name, _symbol) Owned(_owner) {
    pool = IPool(addressProvider.getPool());

    address aTokenAddress = pool.getReserveData(address(asset)).aTokenAddress;
    require(aTokenAddress != address(0), "ASSET_NOT_SUPPORTED");

    aToken = ERC20(aTokenAddress);

    asset.approve(address(pool), type(uint256).max);
  }

  function totalAssets() public view virtual override returns (uint256) {
    return totalSupply;
  }

  function convertToShares(uint256 assets) public view virtual override returns (uint256) {
    return assets;
  }

  function convertToAssets(uint256 shares) public view virtual override returns (uint256) {
    return shares;
  }

  function previewDeposit(uint256 assets) public view virtual override returns (uint256) {
    return assets;
  }

  function previewMint(uint256 shares) public view virtual override returns (uint256) {
    return shares;
  }

  function previewWithdraw(uint256 assets) public view virtual override returns (uint256) {
    return assets;
  }

  function previewRedeem(uint256 shares) public view virtual override returns (uint256) {
    return shares;
  }

  function claimableYield() public view virtual returns (uint256) {
    uint256 balance = aToken.balanceOf(address(this));
    uint256 principal = totalSupply;

    if (balance > principal) {
      return balance - principal;
    } else {
      return 0;
    }
  }

  function claimYield() public virtual {
    address recipient = yieldRecipient;

    require(recipient != address(0), "INVALID_YIELD_RECIPIENT");

    uint256 yield = claimableYield();
    if (yield > 0) {
      emit ClaimYield(recipient, yield);

      aToken.safeTransfer(recipient, yield);
    }
  }

  function setYieldRecipient(address _yieldRecipient) public onlyOwner {
    yieldRecipient = _yieldRecipient;
  }

  function afterDeposit(uint256 assets, uint256 /* shares */ ) internal virtual override {
    pool.deposit(address(asset), assets, address(this), 0);
  }

  function beforeWithdraw(uint256 assets, uint256 /* shares */ ) internal virtual override {
    pool.withdraw(address(asset), assets, address(this));
  }
}
