db = app.OpenDatabase("/storage/emulated/0/GastosTracker/data.db");
db.ExecuteSql(`
	CREATE TABLE IF NOT EXISTS expenses (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		amount REAL,
		date DATE,
		time TIME,
		category TEXT CHECK(category IN ('health', 'leisure', 'home', 'groceries', 'education', 'transportation', 'family', 'fitness', 'food', 'others')),
		remarks TEXT
	);
`);

db.ExecuteSql(`
	CREATE TABLE IF NOT EXISTS settings (
		firstLaunch INTEGER
	);
`);