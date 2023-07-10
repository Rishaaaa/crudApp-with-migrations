const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { Sequelize, Model, DataTypes, Op } = require('sequelize');
const fs = require('fs');
const app = express();
app.use(
    cors({
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        methods: ['POST', 'GET', 'PUT', 'DELETE'],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));


const sequelize = new Sequelize('mysql://root:mysql@localhost:3306/data', {
    dialect: 'mysql',
    createDatabaseIfNotExist: true,
});



class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING(255),
        defaultValue: 'admin',
    },
}, {
    sequelize,
    tableName: 'users',
});

class Student extends Model {}
Student.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    usn: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(255),
        defaultValue: null,
    },
}, {
    sequelize,
    tableName: 'student',
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
});


sequelize
    .authenticate()
    .then(async() => {
        console.log('Connected to the database');
        await createTables();
        await saveSchemaToFile();
        // app.listen(8081, () => {
        //     console.log('Running');
        // });
    })
    .catch((err) => {
        console.log('Error connecting to the database:', err);
    });

async function createTables() {
    try {
        await User.sync();
        console.log('User table created');
        await Student.sync();
        console.log('Student table created');
    } catch (err) {
        console.error('Error creating tables:', err);
    }
}


async function saveSchemaToFile() {
    try {
        const tables = ['users', 'student']; // Add other table names if needed
        const schemaQueries = [];
        for (const table of tables) {
            schemaQueries.push(sequelize.query(`SHOW CREATE TABLE data.${table}`));
        }
        const results = await Promise.all(schemaQueries);
        const schema = results.map((result) => result[0][0]['Create Table']).join('\n\n');
        fs.writeFileSync('schema.sql', schema);
        console.log('Schema saved to schema.sql');
    } catch (err) {
        console.error('Error saving schema:', err);
    }
}


app.get('/getStudent', async(req, res) => {
    try {
        const searchValue = req.query.searchValue || '';
        const filterValue = req.query.filterValue || '';
        const page = parseInt(req.query.page) || 1;
        const sortBy = req.query.sortBy || '';
        const sortDir = req.query.sortDir || '';
        const pageSize = parseInt(req.query.length) || 10; // Number of students per page

        // Query the database to get the total count of students
        const { count, rows } = await Student.findAndCountAll({
            where: {
                [Op.or]: [{
                        name: {
                            [Op.like]: `%${searchValue}%`
                        }
                    },
                    {
                        usn: {
                            [Op.like]: `%${searchValue}%`
                        }
                    },
                    {
                        email: {
                            [Op.like]: `%${searchValue}%`
                        }
                    }
                ]
            },
            order: [
                [sortBy, sortDir]
            ],
            offset: (page - 1) * pageSize,
            limit: pageSize
        });

        const totalRecords = count; // Total count of students

        const totalPages = Math.ceil(totalRecords / pageSize); // Calculate total pages

        const response = {
            draw: parseInt(req.query.draw) || 1, // Set draw value from the request or default to 1
            recordsTotal: totalRecords,
            recordsFiltered: totalRecords,
            data: rows
        };

        res.json(response);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/get/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findByPk(id);
        if (student) {
            return res.json({ Status: 'Success', Result: student });
        } else {
            return res.json({ Status: 'Error', Error: 'Student not found' });
        }
    } catch (err) {
        console.error('Error fetching student:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/getProfile/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findByPk(id);
        if (student) {
            return res.json({ status: 'Success', result: student });
        } else {
            return res.json({ status: 'Error', error: 'Student not found' });
        }
    } catch (err) {
        console.error('Error fetching student:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.get('/getAdmin/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const admin = await User.findByPk(id);
        if (admin) {
            return res.json({ Status: 'Success', Result: admin });
        } else {
            return res.json({ Status: 'Error', Error: 'Admin not found' });
        }
    } catch (err) {
        console.error('Error fetching admin:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.put('/update/:id', async(req, res) => {
    const id = req.params.id;
    const { name, email, usn } = req.body;
    try {
        const existingStudent = await Student.findOne({
            where: {
                [Op.or]: [
                    { usn },
                    { email }
                ],
                id: {
                    [Op.not]: id
                }
            }
        });

        if (existingStudent) {
            if (existingStudent.usn === usn) {
                return res.json({ Error: 'USN already exists' });
            } else {
                return res.json({ Error: 'Email already exists' });
            }
        } else {
            const student = await Student.findByPk(id);
            if (student) {
                student.name = name;
                student.email = email;
                student.usn = usn;
                await student.save();
                return res.json({ Status: 'Success' });
            } else {
                return res.json({ Error: 'Student not found' });
            }
        }
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/delete/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findByPk(id);
        if (student) {
            await student.destroy();
            return res.json({ Status: 'Success' });
        } else {
            return res.json({ Error: 'Student not found' });
        }
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/deleteAdmin/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const admin = await User.findByPk(id);
        if (admin) {
            await admin.destroy();
            return res.json({ Status: 'Success' });
        } else {
            return res.json({ Error: 'Admin not found' });
        }
    } catch (err) {
        console.error('Error deleting admin:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: 'You are not authenticated' });
    } else {
        jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if (err) return res.json({ Error: 'Token wrong' });
            req.role = decoded.role;
            req.id = decoded.id;
            next();
        });
    }
};

app.get('/dashboard', verifyUser, (req, res) => {
    return res.json({ Status: 'Success', role: req.role, id: req.id });
});


app.get('/adminCount', async(req, res) => {
    try {
        const count = await User.count();
        res.json({ admin: count });
    } catch (err) {
        console.error('Error counting admins:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/studentCount', async(req, res) => {
    try {
        const count = await Student.count();
        res.json({ student: count });
    } catch (err) {
        console.error('Error counting students:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login', async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (user) {
            bcrypt.compare(password.toString(), user.password, (err, response) => {
                if (err) return res.json({ Error: 'Password error' });
                if (response) {
                    const { id, role } = user;
                    const token = jwt.sign({ role }, 'jwt-secret-key', { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({ Status: 'Success' });
                } else {
                    return res.json({ Status: 'Error', Error: 'Wrong Email or Password' });
                }
            });
        } else {
            return res.json({ Status: 'Error', Error: 'Wrong Email or Password' });
        }
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/studentLogin', async(req, res) => {
    const { email, password } = req.body;
    try {
        const student = await Student.findOne({ where: { email } });
        if (student) {
            bcrypt.compare(password.toString(), student.password, (err, response) => {
                if (err) return res.json({ Error: 'Password error' });
                if (response) {
                    const { id } = student;
                    const token = jwt.sign({ role: 'student', id }, 'jwt-secret-key', { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({ Status: 'Success', id });
                } else {
                    return res.json({ Status: 'Error', Error: 'Wrong Email or Password' });
                }
            });
        } else {
            return res.json({ Status: 'Error', Error: 'Wrong Email or Password' });
        }
    } catch (err) {
        console.error('Error logging in as student:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/getAdmin', async(req, res) => {
    try {
        const users = await User.findAll();
        return res.json({ Status: 'Success', Result: users });
    } catch (err) {
        console.error('Error fetching admin users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: 'Success' });
});

app.post('/create', upload.single('image'), async(req, res) => {
    const { name, usn, email, password } = req.body;
    try {
        const existingStudent = await Student.findOne({
            where: {
                [Op.or]: [
                    { usn },
                    { email }
                ]
            }
        });

        if (existingStudent) {
            if (existingStudent.usn === usn) {
                return res.json({ Error: 'USN already exists' });
            } else {
                return res.json({ Error: 'Email already exists' });
            }
        } else {
            const hash = await bcrypt.hash(password.toString(), 10);
            const student = await Student.create({
                name,
                usn,
                email,
                password: hash,
                image: req.file.filename
            });
            return res.json({ Status: 'Success' });
        }
    } catch (err) {
        console.error('Error creating student:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/createAdmin', upload.single('image'), async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({
            where: {
                email
            }
        });

        if (existingUser) {
            return res.json({ Error: 'Email already exists' });
        } else {
            const hash = await bcrypt.hash(password.toString(), 10);
            const user = await User.create({
                name,
                email,
                password: hash
            });
            return res.json({ Status: 'Success' });
        }
    } catch (err) {
        console.error('Error creating admin user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(8081, () => {
    console.log('Running');
});