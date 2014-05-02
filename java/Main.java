import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;

public class Main {

	public static void main(String[] args) {
		Connection connect = null;
		Statement countryWiseStatement = null;
		Statement countryStatement = null;
		PreparedStatement preparedStatement = null;
		ResultSet countryWiseCountRs = null;
		ResultSet countryResultSet = null;
		
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			connect = DriverManager.getConnection("jdbc:mysql://localhost/test?" + "user=root&password=root");

			countryWiseStatement = connect.createStatement();
			countryWiseCountRs = countryWiseStatement.executeQuery("select * from countrywise_status");
			
			countryStatement = connect.createStatement();
			countryResultSet = countryStatement.executeQuery("select * from country");
			
			HashMap<String, Integer> countryMap = new HashMap<>();
			while(countryResultSet.next()) {
				countryMap.put(countryResultSet.getString("name"), countryResultSet.getInt("id"));
				System.out.println("C name --> " + countryResultSet.getString("name"));
				System.out.println("C id --> " + countryResultSet.getInt("id"));
			}
			
			while (countryWiseCountRs.next()) {
				try {
					int countryWiseCountId = countryWiseCountRs.getInt("id");
					String country = countryWiseCountRs.getString("country");
					int countryId = countryMap.get(country);
					
					try {
						String query = "update countrywise_status set country_id = " + countryId + " WHERE " +
								" id = " + countryWiseCountId;
						System.out.println(query);
						preparedStatement = connect.prepareStatement(query);
						preparedStatement.executeUpdate();
					} catch (SQLException e) {
						System.out.println("Exception while updating countrywise_status");
						e.printStackTrace();
					}
				} catch(Exception e) {
					System.out.println("Exception while getting details of countrywise_status");
					e.printStackTrace();
				}
			}
		} catch (SQLException e) {
			System.out.println("Outer exception");
			e.printStackTrace();
			
		} finally {
			try {
				if (countryResultSet != null) {
					countryResultSet.close();
				}
			} catch (Exception e) {
			}
			try {
				if (countryWiseCountRs != null) {
					countryWiseCountRs.close();
				}
			} catch (Exception e) {
			}
			try {
				if (countryWiseStatement != null) {
					countryWiseStatement.close();
				}
			} catch (Exception e) {
			}
			try {
				if (connect != null) {
					connect.close();
				}
			} catch (Exception e) {
			}
		}
	}
}
