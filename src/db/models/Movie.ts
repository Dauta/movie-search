import { TMDBResponse } from "@/types/TMDBResponses";
import { DataTypes, Model } from "sequelize";
import sequelize from "../";

class Movie extends Model<TMDBResponse> implements TMDBResponse {
  public id!: number;
  public adult!: boolean;
  public backdrop_path!: string | null;
  public genre_ids!: number[];
  public original_language!: string;
  public original_title!: string;

  public overview!: string;
  public popularity!: number;
  public poster_path!: string | null;
  public release_date!: string;

  public title!: string;
  public video!: boolean;
  public vote_average!: number;
  public vote_count!: number;
}

Movie.init(
  {
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
  },
  {
    sequelize,
    modelName: "Movie",
  }
);

export default Movie;
