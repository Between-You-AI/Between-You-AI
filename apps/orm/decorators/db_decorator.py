def db(func):
    @wraps(func)
    def wrap_func(*args, **kwargs):
        db_session = db_session_context.get()
        return func(*args, **kwargs, db=db_session)
    return wrap_func
  
# ref: https://medium.com/@konstantine.dvalishvil/transactional-methods-fastapi-sqlalchemy-6f33370b95dd