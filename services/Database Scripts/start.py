import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT 

port=49155 # update port of postgres running in Docker here

# Only run create database once
con = psycopg2.connect(user='postgres', password='postgrespw', port=port)
con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
cur = con.cursor()
cur.execute('CREATE DATABASE eventastic')
cur.close()
con.close()

con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host="localhost", port=port)
con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
cur = con.cursor()

"""
cur.execute('drop TABLE hosts cascade;')
cur.execute('drop TABLE saved_cards cascade;')
cur.execute('drop TABLE accounts cascade;')
cur.execute('drop TABLE venues cascade;')
cur.execute('drop TABLE venue_seating cascade;')
cur.execute('drop TABLE events cascade;')
"""

# Only run create tables once
cur.execute('CREATE TABLE accounts (\
            account_id SERIAL PRIMARY KEY,\
            email VARCHAR(50),\
            first_name VARCHAR(50),\
            last_name VARCHAR(50),\
            age INT,\
            mobile_no VARCHAR(20),\
            location VARCHAR(50),\
            password VARCHAR(50),\
            account_type VARCHAR(20),\
            profile_pic VARCHAR(30),\
            reward_points VARCHAR(10),\
            tags TEXT);')

cur.execute('CREATE TABLE hosts(\
            id SERIAL PRIMARY KEY,\
            account_id INT NOT NULL,\
            FOREIGN KEY (account_id) REFERENCES accounts (account_id),\
            organisation_name VARCHAR(50),\
            organisation_desc VARCHAR(50),\
            host_contact_no VARCHAR(20),\
            job_title VARCHAR(30),\
            qualification VARCHAR(50),\
            is_verified BOOLEAN\
            );')

cur.execute('CREATE TABLE saved_cards(id SERIAL PRIMARY KEY, \
            account_id INT NOT NULL,\
            FOREIGN KEY (account_id) REFERENCES accounts (account_id),\
            card_name VARCHAR(50),\
            card_number VARCHAR(16),\
            card_type VARCHAR(10),\
            card_expiry VARCHAR(4)\
            );')

cur.execute('CREATE TABLE venues (\
            venue_id SERIAL PRIMARY KEY, \
            venue_name TEXT, \
            venue_desc TEXT, \
            venue_img TEXT);')

cur.execute('CREATE TABLE venue_seating (\
            seating_id SERIAL PRIMARY KEY,\
            venue_id INT NOT NULL, \
            FOREIGN KEY (venue_id) REFERENCES venues (venue_id),\
            seating_type TEXT, \
            seating_number INT);')

cur.execute('CREATE TABLE events (\
            event_id SERIAL PRIMARY KEY, \
            host_id INT NOT NULL,\
            FOREIGN KEY (host_id) REFERENCES hosts (id),\
            venue_id INT NOT NULL,\
            FOREIGN KEY (venue_id) REFERENCES venues (venue_id),\
            event_title TEXT,\
            event_category TEXT,\
            event_short_desc TEXT,\
            event_desc TEXT,\
            event_start_date DATE,\
            event_start_time TIME,\
            event_end_date DATE,\
            event_end_time TIME,\
            event_location TEXT,\
            event_img TEXT,\
            tags TEXT);')

#""" Enter dummy data here
cur.execute("INSERT INTO accounts values(default, 'vishalsingh6475@gmail.com', 'Vishal', 'Singh', 100, \
            '469717341', 'Sydney', 'Vish', 'Customer', 'uuid', '3000', 'Movies,Adventure,Sports' \
            );")
cur.execute("INSERT INTO accounts values(default, 'James@bond.com', 'James', 'Bond', 007, \
            '7777777', 'Sydney', 'JB', 'Customer', 'uuid', '3000', 'Movies,Adventure,Sports' \
            );")
cur.execute("INSERT INTO accounts values(default, 'vish@gmail.com', 'Vishal', 'S', 200, \
            '469077369', 'Sydney', 'Vish', 'Customer', 'uuid', '3000', 'Movies,Adventure,Sports,Beaches' \
            );")
cur.execute("INSERT INTO accounts values(default, 'neo@matrix.com', 'Keanu', 'Reeves', 57, \
            '123456789', 'Zion', 'Neo', 'Admin', 'uuid', '999999', 'Killing,Machines' \
            );")

    
cur.execute("INSERT INTO hosts values(default, 1, 'Westpac', 'Westpac Banking Corp', '0469717341', \
            'Software Engineer', 'Masters', True \
            );")
cur.execute("INSERT INTO hosts values(default, 2, 'Matrix', 'The Truth', '999999999', \
            'Superhero', 'The One', True \
            );")
cur.execute("INSERT INTO hosts values(default, 3, 'UNSW', 'NO Good University', '000000000', \
            'Jobless', 'Useless Masters', False \
            );")
    
    
cur.execute("INSERT INTO saved_cards values(default, 1, 'Vishal', '9999333366668888', 'Credit', '1236');")
cur.execute("INSERT INTO saved_cards values(default, 2, 'Bond', '7777777777777777', 'Credit', '7777');")
cur.execute("INSERT INTO saved_cards values(default, 4, 'Neo', '9999999999999999', 'Debit', '9999');")


#"""

cur.execute('SELECT * FROM accounts')
records = cur.fetchall()
print("\nAccount details")
for row in records:
    for j in range(len(row)):
        print(row[j], end=" ")
    print()

    
cur.execute('SELECT * FROM hosts')
records = cur.fetchall()
print("\nHost details")
for row in records:
    for j in range(len(row)):
        print(row[j], end=" ")
    print()
    
cur.execute('SELECT * FROM saved_cards')
records = cur.fetchall()
print("\nSaved card details")
for row in records:
    for j in range(len(row)):
        print(row[j], end=" ")
    print()


cur.close()
con.close()
