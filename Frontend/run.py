from app import create_app, db
from app.models import Job, Expense, Service

app = create_app()

import os

# Dynamically set debug mode based on the environment
env = os.getenv('FLASK_ENV', 'production')
app.debug = env == 'development'

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Job': Job, 'Expense': Expense, 'Service': Service}

if __name__ == '__main__':
    app.run(debug=app.debug)  # Dynamically enable/disable debug mode
