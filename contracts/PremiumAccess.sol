// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PremiumAccess {
    IERC20 public immutable eduToken;
    address public immutable owner;
    uint256 public accessFee = 10 * 10**18; // 10 EDU Tokens for premium access
    uint256 public constant POINTS_REQUIRED = 100;
    uint256 public constant EDU_REWARD = 1 * 10**18; // 1 EDU Token for 100 points

    mapping(address => bool) public hasAccess;
    mapping(address => uint256) public studentPoints;

    event AccessGranted(address indexed user, uint256 amount);
    event AccessFeeUpdated(uint256 newFee);
    event FundsWithdrawn(address indexed owner, uint256 amount);
    event PointsAdded(address indexed student, uint256 points);
    event EduTokensClaimed(address indexed student, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(address _eduTokenAddress) {
        eduToken = IERC20(_eduTokenAddress);
        owner = msg.sender;
    }

    function setAccessFee(uint256 _fee) external onlyOwner {
        require(_fee > 0, "Fee must be greater than 0");
        accessFee = _fee;
        emit AccessFeeUpdated(_fee);
    }

    function buyAccess() external {
        require(!hasAccess[msg.sender], "Already has access");
        require(eduToken.balanceOf(msg.sender) >= accessFee, "Insufficient EDU balance");

        bool success = eduToken.transferFrom(msg.sender, address(this), accessFee);
        require(success, "EDU Token transfer failed");

        hasAccess[msg.sender] = true;
        emit AccessGranted(msg.sender, accessFee);
    }

    function addPoints(address _student, uint256 _points) external onlyOwner {
        require(_points > 0, "Points must be greater than zero");
        studentPoints[_student] += _points;
        emit PointsAdded(_student, _points);
    }

    function claimEduTokens() external {
        require(studentPoints[msg.sender] >= POINTS_REQUIRED, "Not enough points to claim");

        studentPoints[msg.sender] -= POINTS_REQUIRED; // Deduct 100 points
        require(eduToken.transfer(msg.sender, EDU_REWARD), "Token transfer failed");

        emit EduTokensClaimed(msg.sender, EDU_REWARD);
    }

    function withdrawFunds() external onlyOwner {
        uint256 balance = eduToken.balanceOf(address(this));
        require(balance > 0, "No EDU tokens to withdraw");

        bool success = eduToken.transfer(owner, balance);
        require(success, "Transfer failed");

        emit FundsWithdrawn(owner, balance);
    }

    function checkAccess(address _user) external view returns (bool) {
        return hasAccess[_user];
    }

    function getPoints(address _student) external view returns (uint256) {
        return studentPoints[_student];
    }
}
