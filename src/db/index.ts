import { DataTypes, Sequelize } from "sequelize";
import Movie from "./models/Movie";

let sequelize: Sequelize | null = null;

export async function loadSequelize() {
  const sequelize = new Sequelize("sqlite::memory:", {
    pool: {
      max: 2,
      min: 0,
      idle: 0,
      acquire: 3000,
    },
  });

  sequelize.define<Movie>("Movie", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    adult: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    backdrop_path: {
      type: DataTypes.STRING,
    },
    genre_ids: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    original_language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    original_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    popularity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    poster_path: {
      type: DataTypes.STRING,
    },
    release_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    video: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    vote_average: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    vote_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  await sequelize.sync();

  return sequelize;
}

export async function getDbInstance() {
  if (!sequelize) {
    sequelize = await loadSequelize();
  } else {
    // restart connection pool to ensure connections are not re-used across invocations
    sequelize.connectionManager.initPools();
  }

  return sequelize;
}

export default sequelize;
