const ROLES = {
  ADMIN: "admin",
  CLIENT: "client",
  LAWYER: "lawyer",
};

const URGENCY_LEVELS = {
  STANDERED: "Standard",
  PRIORITY: "Priority",
  URGENT: "Urgent",
};

const BUDGET_TYPES = {
  FIXED: "Fixed",
  HOURLY: "Hourly",
};

const CASE_STATUS = {
  OPEN: "open",
  PENDING: "pending",
  CLOSED:"closes"

};

module.exports = {
  ROLES,
  URGENCY_LEVELS,
  BUDGET_TYPES,
  CASE_STATUS
};
