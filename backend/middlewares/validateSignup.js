const z = require('zod');

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z.string()
    .regex(/^[0-9]{6}@student\.nitandhra\.ac\.in$/, "Student email must be in the format [6 digits]@student.nitandhra.ac.in"),

  password: z.string().min(6, "Password must be at least 6 characters long"),

  department: z.string().min(1, "Department is required"),

  year: z.number()
    .int("Year must be an integer")
    .min(1, "Year must be at least 1")
    .max(4, "Year cannot be more than 4"),

  skills: z.array(z.string()).optional(),

  bio: z.string().optional(),

  importantLinks : z.record(z.string().url()).refine(
    (val) => Object.keys(val).length <= 5,
    { message: 'You can add a maximum of 5 important links' }
).optional()

});

const checkSignup = (req, res, next) => {
    try {
      const result = registerSchema.safeParse(req.body);

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

module.exports = checkSignup;

