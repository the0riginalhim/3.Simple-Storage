import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const SimpleStorage = () => {
  const [value, setValue] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);

  const contractAddress = '0x93f8dddd876c7dBE3323723500e83E202A7C96CC';
  const contractABI = [
    [
        {
            "inputs": [],
            "name": "incrementValue",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "setValue",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getValue",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
  ];

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
    const simpleStorage = new web3.eth.Contract(contractABI, contractAddress);
    setContract(simpleStorage);
    const storedValue = await simpleStorage.methods.getValue().call();
    setValue(storedValue);
  };

  const handleSetValue = async () => {
    await contract.methods.setValue(inputValue).send({ from: account });
    const updatedValue = await contract.methods.getValue().call();
    setValue(updatedValue);
  };

  const handleIncrementValue = async () => {
    await contract.methods.incrementValue().send({ from: account });
    const updatedValue = await contract.methods.getValue().call();
    setValue(updatedValue);
  };

  return (
    <div>
      <h1>Simple Storage</h1>
      <p>Stored Value: {value}</p>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSetValue}>Set Value</button>
      <button onClick={handleIncrementValue}>Increment Value</button>
    </div>
  );
};

export default SimpleStorage;
