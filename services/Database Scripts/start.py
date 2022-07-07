import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT


port = 5432  # update port of postgres running in Docker here
host = "localhost"

# Only run create database once
'''
print('\nCreating Database ...')
con = psycopg2.connect(
    user='postgres', password='postgrespw', host=host, port=port)
con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
cur = con.cursor()
cur.execute('CREATE DATABASE eventastic')
cur.close()
con.close()
'''

con = psycopg2.connect(database='eventastic', user='postgres',
                       password='postgrespw', host=host, port=port)
con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
cur = con.cursor()

print('\nDropping Tables ...')
cur.execute('drop TABLE hosts cascade;')
cur.execute('drop TABLE saved_cards cascade;')
cur.execute('drop TABLE accounts cascade;')
cur.execute('drop TABLE venues cascade;')
cur.execute('drop TABLE venue_seating cascade;')
cur.execute('drop TABLE events cascade;')
cur.execute('drop TABLE bookings cascade;')
cur.execute('drop TABLE tickets cascade;')

# Only run create tables once
print('\nCreating Tables ...')
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
            profile_pic VARCHAR(50),\
            reward_points VARCHAR(10),\
            tags TEXT, \
            user_desc VARCHAR(100) \
            );')

cur.execute('CREATE TABLE hosts(\
            id SERIAL PRIMARY KEY,\
            account_id INT NOT NULL,\
            FOREIGN KEY (account_id) REFERENCES accounts (account_id),\
            organisation_name VARCHAR(50),\
            organisation_desc VARCHAR(50),\
            host_contact_no VARCHAR(20),\
            job_title VARCHAR(30),\
            qualification VARCHAR(50),\
            is_verified BOOLEAN, \
            host_status VARCHAR(15), \
            org_email VARCHAR(30) \
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

# Events Status : UPCOMING, CANCELLED, COMPLETED
cur.execute('CREATE TABLE events (\
            event_id SERIAL PRIMARY KEY, \
            host_id INT NOT NULL,\
            FOREIGN KEY (host_id) REFERENCES hosts (id),\
            account_id INT NOT NULL,\
            FOREIGN KEY (account_id) REFERENCES accounts (account_id),\
            venue_id INT NOT NULL,\
            FOREIGN KEY (venue_id) REFERENCES venues (venue_id),\
            gen_seat_price float8,\
            front_seat_price float8,\
            mid_seat_price float8,\
            back_seat_price float8,\
            event_title TEXT,\
            event_category TEXT,\
            event_short_desc TEXT,\
            event_desc TEXT,\
            event_start_datetime TEXT,\
            event_end_datetime TEXT,\
            event_location TEXT,\
            event_img TEXT,\
            event_status TEXT,\
            tags TEXT);')

# Bookings status :  [Booked, Cancelled, Completed].
cur.execute('CREATE TABLE bookings (\
            booking_id SERIAL PRIMARY KEY, \
            account_id INT NOT NULL,\
            FOREIGN KEY (account_id) REFERENCES accounts (account_id),\
            event_id INT NOT NULL,\
            FOREIGN KEY (event_id) REFERENCES events (event_id),\
            booking_status VARCHAR(15),\
            total_cost float8);')

# Ticket type : General, Front, Middle, Back
cur.execute('CREATE TABLE tickets (\
            ticket_id SERIAL PRIMARY KEY, \
            venue_id INT NOT NULL,\
            FOREIGN KEY (venue_id) REFERENCES venues (venue_id),\
            event_id INT NOT NULL,\
            FOREIGN KEY (event_id) REFERENCES events (event_id),\
            booking_id INT,\
            ticket_ref TEXT,\
            ticket_status TEXT,\
            qr_code TEXT,\
            ticket_type TEXT,\
            ticket_price float8);')

# Enter dummy data here
print('\nInserting dummy data ...')
cur.execute("INSERT INTO accounts values(default, 'vishalsingh6475@gmail.com', 'Vishal', 'Singh', 66, \
            '469717341', 'Sydney', 'Vish', 'Customer', 'uuid', '3000', 'Movies,Adventure,Sports', 'Doing MIT course at UNSW' \
            );")
cur.execute("INSERT INTO accounts values(default, 'James@bond.com', 'James', 'Bond', 77, \
            '777777777', 'Sydney', 'JB', 'Customer', 'uuid', '3000', 'Movies,Adventure,Sports', 'Actor for James Bond movies' \
            );")
cur.execute("INSERT INTO accounts values(default, 'vish@gmail.com', 'Vishal', 'S', 80, \
            '469077369', 'Sydney', 'Vish', 'Customer', 'uuid', '3000', 'Movies,Adventure,Sports,Beaches', 'Just studying' \
            );")
cur.execute("INSERT INTO accounts values(default, 'neo@matrix.com', 'Keanu', 'Reeves', 57, \
            '123456789', 'Zion', 'Neo', 'Admin', 'uuid', '9999', 'Killing,Machines', 'Savior of Zion' \
            );")


cur.execute("INSERT INTO hosts values(default, 1, 'Westpac', 'Westpac Banking Corp', '0469717341', \
            'Software Engineer', 'Masters', False, 'Pending', 'vish@westpac.com' \
            );")
cur.execute("INSERT INTO hosts values(default, 2, 'Matrix', 'The Truth', '999999999', \
            'Superhero', 'The One', False, 'Pending', 'anderson@mat.com' \
            );")
cur.execute("INSERT INTO hosts values(default, 3, 'UNSW', 'Sydney University', '000000000', \
            'Information Technology', 'Masters', False, 'Pending', 'vish@unsw.com' \
            );")


cur.execute(
    "INSERT INTO saved_cards values(default, 1, 'Vishal', '9999333366668888', 'Credit', '1228');")
cur.execute(
    "INSERT INTO saved_cards values(default, 2, 'Bond', '7777777777777777', 'Credit', '0426');")
cur.execute(
    "INSERT INTO saved_cards values(default, 4, 'Neo', '9999999999999999', 'Debit', '1030');")

cur.execute("INSERT INTO  venues values(default, 'Shark Hotel Sydney, NSW', 'Old-school mainstay featuring classic pub favourites & multiple bars, plus billiards.', '9913d5a2-f628-11ec-b939-0242ac120002.jpg', '127 Liverpool St, Sydney NSW 2000');")
cur.execute("INSERT INTO  venues values(default, 'Sydney Entertainment Centre', 'It is one of Sydneys larger concert venues, licensed to accommodate over 13,000 people as a conventional theatre or 8,000 as a theatre-in-the-round.', '9913d872-f628-11ec-b939-0242ac120002.jpg', '35 Harbour St; Sydney NSW 2000');")
cur.execute("INSERT INTO  venues values(default, 'Potts Point Hotel, Potts Point, NSW', 'Potts Point Hotel is a new oasis of delicious in-house smoked meats and seafood, nestled in the bustling metropolitan landscape that is Potts Point.', '9913d9a8-f628-11ec-b939-0242ac120002.jpg', '33-35 Darlinghurst Rd, Potts Point NSW 2011');")
cur.execute("INSERT INTO  venues values(default, 'Sydney Cove Passenger Terminal', 'The Overseas Passenger Terminal, known officially as the Sydney Cove Passenger Terminal, is a public passenger terminal servicing cruise ships and ocean liners located in Circular Quay, Sydney, Australia.', '9913de26-f628-11ec-b939-0242ac120002.jpg', '130 Argyle St, The Rocks NSW 2000');")
cur.execute("INSERT INTO  venues values(default, 'Centennial Park Brazilian Fields', 'The Brazilian Fields in Centennial Park feature a beautiful pine forest as their backdrop to the north and Lachlan Reserve to the south.', '9913df7a-f628-11ec-b939-0242ac120002.jpg', 'Centennial Park NSW 2021');")
cur.execute("INSERT INTO  venues values(default, 'The Venue Alexandria', 'Sydney Premium Major Event Venue! State of art warehouse conversion with industrial and modern design elements across three diverse event spaces.', '9913e0a6-f628-11ec-b939-0242ac120002.jpg', '55 Doody St, Alexandria NSW 2015');")

cur.execute("INSERT INTO venue_seating values (default, 1,'front',100);")
cur.execute("INSERT INTO venue_seating values (default, 1,'middle',100);")
cur.execute("INSERT INTO venue_seating values (default, 2,'back',100);")
cur.execute("INSERT INTO venue_seating values (default, 2,'front',100);")
cur.execute("INSERT INTO venue_seating values (default, 2,'middle',100);")
cur.execute("INSERT INTO venue_seating values (default, 3,'back',100);")
cur.execute("INSERT INTO venue_seating values (default, 3,'front',100);")
cur.execute("INSERT INTO venue_seating values (default, 3,'middle',100);")
cur.execute("INSERT INTO venue_seating values (default, 4,'back',100);")
cur.execute("INSERT INTO venue_seating values (default, 4,'front',100);")
cur.execute("INSERT INTO venue_seating values (default, 4,'middle',100);")
cur.execute("INSERT INTO venue_seating values (default, 5,'back',100);")
cur.execute("INSERT INTO venue_seating values (default, 5,'middle',100);")
cur.execute("INSERT INTO venue_seating values (default, 6,'front',100);")
cur.execute("INSERT INTO venue_seating values (default, 6,'middle',100);")

cur.execute("INSERT INTO  events values(default, 1, 1, 1, 20.00, 100.00, 80.00, 60.00, 'Sydney KPOP Party', 'Music','Sydney KPOP Party BTS Special!','STRICTLY KPOP & K-HIPHOP! KPOP ALBUM GIVEAWAYS! LIVE DJS!','2022-08-25T19:00:00+10:00','2022-08-25T21:00:00+10:00','Shark Hotel Sydney, NSW','1603dfd6-efb6-11ec-8ea0-0242ac120002.jpeg','UPCOMING','Pop Music');")
cur.execute("INSERT INTO  events values(default, 1, 1, 2, 20.00, 120.00, 70.00, 50.00, 'Red Hot Chili Peppers Live', 'Music','RHCP Live ! Don''t miss out !', 'Catch Red Hot Chili Peppers live for the tour of their new album Unlimited Love ...', '2022-08-25T19:00:00+10:00', '2022-08-25T21:00:00+10:00','Sydney Entertainment Centre','1603dfd6-efb6-11ec-8ea0-0242ac120003.jpeg','UPCOMING','Rock,Funk');")
cur.execute("INSERT INTO  events values(default, 2, 2, 3, 10.00, 100.00, 90.00, 80.00, 'Improv Comedy Night','Arts','Lots of laughs ! Don''t miss out !','Four of Sydney''s best improv comedy teams will battle for glory. You - the audience - will decide who wins on the night!','2022-10-10T20:00:00+10:00','2022-10-10T21:00:00+10:00','Potts Point Hotel, Potts Point, NSW','1603dfd6-efb6-11ec-8ea0-0242ac120004.jpeg','UPCOMING', 'Dance,Comedy');")
cur.execute("INSERT INTO  events values(default, 2, 2, 4, 15.00, 110.00, 85.00, 55.00, 'Whisky Live Sydney 2022','Food','Sydney''s Premier Whisky Event.','WHISKY LIVE is Sydney''s premiere whisky sampling event, featuring high quality whiskies and spirits, all open under one roof for your tasting pleasure. Come along and learn while you taste.','2022-09-11T20:00:00+10:00','2022-09-11T22:00:00+10:00','Sydney Cove Passenger Terminal','b51a5319-f9ae-4191-aa95-fdf9a808e0fb.jpeg','UPCOMING','Spirits');")
cur.execute("INSERT INTO  events values(default, 3, 3, 5, 20.00, 80.00, 70.00, 50.00, 'Jump for Joy','Kids Entertainment','Australia''s biggest inflatable park!','Jump for Joy will be back in town at Centennial Park with Australia''s biggest inflatable play-park!','2022-11-01T20:00:00+10:00','2022-11-01T22:00:00+10:00','Centennial Park Brazilian Fields','50407a37-7fce-4a17-97ba-2dbc68446db6.jpeg','UPCOMING', 'Family Friendly');")
cur.execute("INSERT INTO  events values(default, 3, 3, 6, 20.00, 12.00, 100.00, 90.00, 'Venture & Capital 2022','Business','Come and be bored!','Everything we do is about connecting ventures with capital—this is why Wholesale Investor exists. In line with this, our 2022 Venture & Capital Conference focuses on empowering innovation, ambition, and capital.','2022-12-02T20:00:00+10:00','2022-12-02T22:00:00+10:00', 'The Venue Alexandria','39061bdb-9ace-45ed-9ddf-8b40223fc1b2.jpeg','UPCOMING','Startups Small Business,Investment');")

cur.execute("INSERT INTO bookings values (default, 1, 1, 'Booked', 500.0);")
cur.execute("INSERT INTO bookings values (default, 1, 1, 'Booked', 200.0);")

cur.execute("INSERT INTO tickets values (default, 1, 1, 1, 'F_1', 'Purchased', 'QR', 'Front', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, 1, 'F_2', 'Purchased', 'QR', 'Front', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, 1, 'F_3', 'Purchased', 'QR', 'Front', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, -1, 'F_4', 'Available', 'QR', 'Front', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, -1, 'F_5', 'Available', 'QR', 'Front', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, -1, 'F_6', 'Available', 'QR', 'Front', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, -1, 'F_7', 'Available', 'QR', 'Front', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, -1, 'F_8', 'Available', 'QR', 'Front', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, -1, 'F_9', 'Available', 'QR', 'Front', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, -1, 'F_10', 'Available', 'QR', 'Front', 100.0);")

cur.execute("INSERT INTO tickets values (default, 1, 1, 1, 'M_1', 'Purchased', 'QR', 'Middle', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, 1, 'M_2', 'Purchased', 'QR', 'Middle', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, 2, 'M_3', 'Purchased', 'QR', 'Middle', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, 2, 'M_4', 'Purchased', 'QR', 'Middle', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, -1, 'M_5', 'Available', 'QR', 'Middle', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, -1, 'M_6', 'Available', 'QR', 'Middle', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, -1, 'M_7', 'Available', 'QR', 'Middle', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, -1, 'M_8', 'Available', 'QR', 'Middle', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, -1, 'M_9', 'Available', 'QR', 'Middle', 100.0);")
cur.execute("INSERT INTO tickets values (default, 1, 1, -1, 'M_10', 'Available', 'QR', 'Middle', 100.0);")


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

cur.execute('SELECT * FROM venue_seating')
records = cur.fetchall()
print("\nVenue_seating details")
for row in records:
    for j in range(len(row)):
        print(row[j], end=" ")
    print()

cur.close()
con.close()