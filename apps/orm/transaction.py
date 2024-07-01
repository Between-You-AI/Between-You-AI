class Transaction:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None:
            # rollback and let the exception propagate
            self.session.rollback()
            return False

        self.session.commit()
        return True
