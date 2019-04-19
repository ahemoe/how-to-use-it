FROM python:3
ENV PYTHONUNBUFFERED 1

# Install packages
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/

# Create user
USER www-data