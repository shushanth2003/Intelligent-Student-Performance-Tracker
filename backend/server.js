const express=require("express");
const app = express();
const bodyParser=require('body-parser')
const dbConnect=require("./lib/db.js")
const PORT=6969;
const router=require('./route/account.route.js')
const cors=require("cors");
app.use(express.json()); // ✅ Required for parsing JSON body
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

dbConnect();

app.use(cors());
app.use(cors({ origin: ' http://localhost:5173' }));


app.use('/api', router);

app.listen(PORT, () => console.log(`Server Connected Successfully in port: http://localhost:${PORT}`));