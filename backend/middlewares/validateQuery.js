const { z } = require("zod");

const querySchema = z.object({
  sortBy: z.enum(["recent", "mostlikes"]).optional().default("recent"),
  tags: z.string().optional(), 
  page: z.string().default('1').transform((val) => {
    const num = parseInt(val, 10);
    return (isNaN(num))? '1': num;
  }),
  mine: z.enum(["true", "false"]).optional().default("false"),
});

const checkQuery = (req, res, next) => {
  try {
    const result = querySchema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({
        error: "Invalid query parameters",
        details: result.error.errors,
      });
    }

    req.query = result.data;
    next();
  }
  catch (err) {
        res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = checkQuery;
