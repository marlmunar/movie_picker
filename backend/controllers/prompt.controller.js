export const processPrompt = (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  res.status(200).json({
    // message: "User created successfully",
    // data: { name, email },
  });
};
