const z = require("zod");

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  authorId: z.string().length(24).regex(/^[a-f0-9]+$/),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).optional(),
});

const PostValidation =  (req, res, next) => {
  try {
    req.body["authorId"] = req.user.id;
    const result = postSchema.safeParse(req.body);
    if (!result.success) {
        const errorMessage = result.error.errors[0].message;
        return res.status(400).json({ error: errorMessage });
    } 
      next();
  } catch (err) {
        res.status(500).json({ error: 'Server Error' });
  }

}
module.exports = {PostValidation}; 