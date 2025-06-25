const z = require("zod");

const loginSchema = z.object({
  email: z.string()
    .regex(/^[0-9]{6}@student\.nitandhra\.ac\.in$/, "Email must be in the format [6 digits]@student.nitandhra.ac.in"),

  password: z.string().min(6, "Password must be at least 6 characters long")
});

const checkSignin = (req, res, next) => {
    try {
      const result = loginSchema.safeParse(req.body);

      if (!result.success) {
        const errorMessage = result.error.errors[0].message;
        return res.status(400).json({ error: errorMessage });
      }
      next();
    } 
    catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
} 

module.exports = checkSignin;