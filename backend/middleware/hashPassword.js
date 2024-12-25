const bcrypt = require("bcrypt");

const saltRounds = 10;
const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

const isPasswordValid = await bcrypt.compare(providedPassword, hashedPasswordFromDB);

if (!isPasswordValid) {
    return res.status(401).send({message: "Invalid credentials."});
}
const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
res.status(200).send({ token });