const z = require("zod");

const updateSchema = z.object({
  title: z.string().trim().min(1, "Title is required").optional(),
  content: z.string().trim().min(1, "Title is required").optional(),
  tags: z.array(z.string()).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "Change at least 1 field to proceed"
});

const checkUpdateRequest = (req, res, next) => {
  try {
    const request = req.body;
    const result = updateSchema.safeParse(request);
    if (!result.success) {
      const errorMessage = result.error.errors[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    next();
  }
  catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = checkUpdateRequest;