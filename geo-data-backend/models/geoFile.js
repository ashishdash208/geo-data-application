module.exports = (sequelize, DataTypes) => {
    const GeoFile = sequelize.define('GeoFile', {
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      geoJsonData: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    });
    return GeoFile;
  };  