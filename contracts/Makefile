
-include .env

# Clean the repo
clean  :; forge clean

anvil :; anvil --fork-url ${FORK_URL} --fork-block-number ${FORK_BLOCK_NUMBER} --chain-id 31337 --block-time 2

deploy :; @forge script script/GhostVault.s.sol --rpc-url ${RPC_URL}  --private-key ${PRIVATE_KEY} --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY}  -vvvv

# local development
deploy-anvil :; @forge script script/GhostVault.s.sol --rpc-url http://localhost:8545  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast 

from ?= 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
amount ?= 1

send-eth :; @cast send ${to} --from ${from} --value $(shell cast to-wei ${amount}) --unlocked
send-usdc :; @cast send ${USDC} --from ${from} "transfer(address,uint256)(bool)" ${to} $(shell echo ${amount} \* 1e6 | bc) --unlocked