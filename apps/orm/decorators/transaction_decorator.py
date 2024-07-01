db_session_context = contextvars.ContextVar("db_session", default=None)

def transactional(func):
    @wraps(func)
    def wrap_func(*args, **kwargs):
        db_session = db_session_context.get()
        if db_session:
            return func(*args, **kwargs)
        db_session = sessionmaker()
        db_session_context.set(db_session)
        try:
            result = func(*args, **kwargs)
            db_session.commit()
        except Exception as e:
            db_session.rollback()
            raise
        finally:
            db_session.close()
            db_session_context.set(None)
        return result
    return wrap_func