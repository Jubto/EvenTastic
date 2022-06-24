import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT 

port=49157 # update port of postgres running in Docker here

""" Only run create database once
con = psycopg2.connect(user='postgres', password='postgrespw', port=port)
con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
cur = con.cursor()
cur.execute('CREATE DATABASE eventastic')
cur.close()
con.close()
"""

con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host="localhost", port=port)
con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
cur = con.cursor()


cur.execute('drop TABLE hosts cascade;')
cur.execute('drop TABLE saved_cards cascade;')
cur.execute('drop TABLE accounts cascade;')
cur.execute('drop TABLE venues cascade;')
cur.execute('drop TABLE venue_seating cascade;')
cur.execute('drop TABLE events cascade;')


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
            venue_img TEXT, \
            venue_location TEXT);')

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

cur.execute("INSERT INTO  venues values(default, 'Opera House', 'The Sydney Opera House is a multi-venue performing arts centre in Sydney', 'uuid', 'Bennelong Point, Sydney NSW 2000');")
cur.execute("INSERT INTO  venues values(default, 'Curzon Hall', 'This elegantly appointed room is suitable for intimate style events. This room features ornate chandeliers, original elements and historic architecture', 'uuid', '53 Agincourt Rd, Marsfield NSW 2122');")
cur.execute("INSERT INTO  venues values(default, 'Dockside', 'Dockside is an outstanding place for weddings, business events, conventions, gala dinners and cocktail parties', 'uuid', '2 Wheat Rd, Sydney NSW 2000');")
cur.execute("INSERT INTO  venues values(default, 'Establishment Ballroom', 'A stylish and classy space hidden in the heritage Establishment building. Establishment Ballroom is made for elegant weddings and memorable celebrations', 'uuid', '252 George St, Sydney NSW 2000');")
cur.execute("INSERT INTO  venues values(default, 'Doltone House Hyde Park', 'Doltone House Hyde Park offers contemporary sophistication opposite Sydney Hyde Park, with floor to ceiling arched windows.', 'uuid', '3/181 Elizabeth St, Sydney NSW 2000');")
cur.execute("INSERT INTO  venues values(default, 'The Venue Alexandria', 'Sydney Premium Major Event Venue! State of art warehouse conversion with industrial and modern design elements across three diverse event spaces.', 'uuid', '55 Doody St, Alexandria NSW 2015');")

cur.execute("INSERT INTO  events values(default, 1, 1,'Musical Event', 'Category1','Short Desc1','Event Full Desc1',TO_DATE('17/12/2022', 'DD/MM/YYYY'),'12:00:00',TO_DATE('17/12/2015', 'DD/MM/YYYY'),'14:00:00','Opera House','uuid','Tag1,Tag2,Tag3');")
cur.execute("INSERT INTO  events values(default, 1, 2,'Ring Ceremony', 'Category2','Short Desc2', 'Event Full Desc2',TO_DATE('10/12/2022', 'DD/MM/YYYY'),'13:00:00',TO_DATE('10/12/2022', 'DD/MM/YYYY'),'16:00:00','Curzon Hall','uuid','Tag4,Tag5,Tag6');")
cur.execute("INSERT INTO  events values(default, 2, 3,'Cocktail Party','Category3','Short Desc3','Event Full Desc3',TO_DATE('15/10/2022', 'DD/MM/YYYY'),'14:00:00',TO_DATE('10/12/2022', 'DD/MM/YYYY'),'17:00:00','Dockside','uuid', 'Tag4,Tag5,Tag6');")
cur.execute("INSERT INTO  events values(default, 2, 4,'Charity Event','Category4','Short Desc4','Event Full Desc4',TO_DATE('11/10/2022', 'DD/MM/YYYY'),'14:00:00',TO_DATE('11/12/2022', 'DD/MM/YYYY'), '18:00:00','Establishment Ballroom','uuid','Tag7,Tag8,Tag9');")
cur.execute("INSERT INTO  events values(default, 3, 5,'Company X Celebrations','Category5','Short Desc5','Event Full Desc5',TO_DATE('11/9/2022', 'DD/MM/YYYY'),'15:00:00',TO_DATE('11/9/2022', 'DD/MM/YYYY'),'18:00:00','Doltone House Hyde Park','uuid', 'Tag10,Tag11,Tag12');")
cur.execute("INSERT INTO  events values(default, 3, 6,'Birthday Party','Category6','Short Desc6','Event Full Desc6',TO_DATE('13/10/2022', 'DD/MM/YYYY'),'15:00:00',TO_DATE('13/12/2022', 'DD/MM/YYYY'), '19:00:00', 'The Venue Alexandria','uuid','Tag13,Tag14,Tag15');")
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

cur.execute('SELECT * FROM venues')
records = cur.fetchall()
print("\nSaved venue details")
for row in records:
    for j in range(len(row)):
        print(row[j], end=" ")
    print()

cur.execute('SELECT * FROM events')
records = cur.fetchall()
print("\nSaved event details")
for row in records:
    for j in range(len(row)):
        print(row[j], end=" ")
    print()

cur.close()
con.close()
