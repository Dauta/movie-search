import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

sequelize.sync().then(() => console.log("db synced!"));

export default sequelize;
