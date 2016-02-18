-- Insert users
INSERT INTO users
    (id, email, password, given_name, surname)
VALUES
    (1, 'Curtis.MBSmith@gmail.com', 'MyPass25', Curtis, Smith);
INSERT INTO users
    (id, email, password, given_name, surname)
VALUES
    (2, 'Liz.Snell@gmail.com', 'LizzyPass24', Liz, Snell);

-- Insert households
INSERT INTO households
    (id, name, type)
VALUES
    (1, 'Curtis and Liz\'s home', 'Family');

-- Insert household users
INSERT INTO household_users
    (user_id, household_id)
VALUES
    (1, 1);
INSERT INTO household_users
    (user_id, household_id)
VALUES
    (2, 1);

-- Insert tasks
INSERT INTO tasks
    (id, description, due, completed, created_by, completed_by)
VALUES
    (1, 'Scoop litter', now(), null, 1, null);

INSERT INTO tasks
    (id, description, due, completed, created_by, completed_by)
VALUES
    (2, 'Put away clean dishes', now() - interval '1 days',
        now() - interval '1 days' + interval '2 hours', 2, 1);

INSERT INTO tasks
    (id, description, due, completed, created_by, completed_by)
VALUES
    (3, 'Put away clean dishes', now() + interval '3 hours', null, 2, null);

INSERT INTO tasks
    (id, description, due, completed, created_by, completed_by)
VALUES
    (4, 'Feed the cats', now() - interval '5 hours', now() - interval '3 hours', 1, 2);
