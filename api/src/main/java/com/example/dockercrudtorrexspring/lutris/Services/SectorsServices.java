package com.example.dockercrudtorrexspring.lutris.Services;

import com.example.dockercrudtorrexspring.lutris.Entities.Sector;
import com.example.dockercrudtorrexspring.lutris.Repositories.DatabaseRepository;

import java.security.NoSuchAlgorithmException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class SectorsServices {

    DatabaseRepository databaseRepository;

    public SectorsServices() throws NoSuchAlgorithmException {
        databaseRepository = DatabaseRepository.getInstance();

    }

    public Sector create(Sector sector) throws SQLException {
        String sql = "insert into sectors (nameSector, launchDate) VALUES (?, ?);";
        PreparedStatement stm = databaseRepository.getConnection().prepareStatement(sql);
        stm.setString(1, sector.getName());
        stm.setString(2, sector.getLaunchDate());
        stm.executeUpdate();

        // TODO: return sector with complete data populated (id, createdAt, ...)
        return sector;
    }

    public ArrayList<Sector> getAll() throws SQLException{
        ArrayList<Sector> sectors = new ArrayList<>();

        String sql = "SELECT * FROM sectors";
        Statement statement = databaseRepository.getConnection().createStatement();
        ResultSet resultSet = statement.executeQuery(sql);

        // TODO: finish it
        while(resultSet.next()) {
            String name = resultSet.getString("name");
            String launchDate = resultSet.getString("launchDate");

            sectors.add(new Sector());
        }

        // TODO: ensure to always return an `ArrayList`
        return null;
    }

    public Sector findOne(int id) throws SQLException {
        // TODO: return `Sector` when finded, return null otherwise
        String sql = "SELECT * FROM sectors WHERE id =" + id;
        Statement statement = databaseRepository.getConnection().createStatement();
        ResultSet resultSet = statement.executeQuery(sql);
        resultSet.next();

        return null;
    }

    public void update(Sector sector) {
        // TODO: implement it
    }

    public void delete(int id) throws SQLException{
        String sql = "DELETE FROM sectors WHERE id =" + id;
        Statement statement = databaseRepository.getConnection().createStatement();
        statement.executeQuery(sql);
    }

}