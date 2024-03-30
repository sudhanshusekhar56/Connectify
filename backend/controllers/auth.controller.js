export const login = (req, res) => {
  console.log("Login Route");
  res.post("Login Route");
};

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
  } catch (error) {
    console.log({ Error: error });
  }
};

export const logout = (req, res) => {
  console.log("Logout Route");
  res.post("Logout Route");
};
