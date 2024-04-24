import boto3
import csv

csv_file_path = 'CleanedDataFiles/DuffieldHall_2023_test.csv'
table_name = 'BuildingUtilityData_Cornell'

# Initialize a DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(table_name)

# Function to read CSV file and upload each row to DynamoDB
def upload_csv_to_dynamodb(csv_file_path, table):
    with open(csv_file_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            item = {
                'slottime': row['slottime'],
                'name': row['\ufeffname'],
                'ChilledWater': (row['Chilled Water']),
                'Electric': (row['Electric']),
                'Steam': (row['Steam'])
            }
            table.put_item(Item=item)
            print(f"Uploaded: {item}")

# Main execution
if __name__ == "__main__":
    import decimal  # Import here to avoid affecting global boto3 serialization.
    upload_csv_to_dynamodb(csv_file_path, table)
