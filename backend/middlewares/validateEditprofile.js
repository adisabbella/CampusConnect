const z = require("zod");

const updateSchema = z.object({
  year: z.number()
    .int("Year must be an integer")
    .min(1, "Year must be at least 1")
    .max(4, "Year cannot be more than 4").optional(),

  skills: z.array(z.string()).optional(),

  bio: z.string().optional(),

  importantLinks : z.record(z.string().url()).refine(
    (val) => Object.keys(val).length <= 5,
    { message: 'You can add a maximum of 5 important links' }
  ).optional()
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