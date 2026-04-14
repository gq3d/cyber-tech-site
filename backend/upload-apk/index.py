import os
import re
import json
import boto3
import requests

def handler(event: dict, context) -> dict:
    """Скачивает APK с Google Drive и загружает в S3 хранилище проекта."""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    file_id = '1P9gYPUsPiU1r8j84Dpl2iGeYYbUnAJf3'

    session = requests.Session()

    # Первый запрос — получаем страницу подтверждения или сразу файл
    url = f'https://drive.google.com/uc?export=download&id={file_id}'
    response = session.get(url, timeout=60)

    # Если Google вернул страницу подтверждения (для больших файлов) — ищем confirm token
    if 'text/html' in response.headers.get('Content-Type', ''):
        # Ищем confirm параметр в HTML
        match = re.search(r'confirm=([0-9A-Za-z_\-]+)', response.text)
        if match:
            confirm = match.group(1)
        else:
            confirm = 't'
        
        # Также ищем uuid если есть
        uuid_match = re.search(r'uuid=([0-9A-Za-z_\-]+)', response.text)
        if uuid_match:
            uuid = uuid_match.group(1)
            download_url = f'https://drive.usercontent.google.com/download?id={file_id}&export=download&confirm={confirm}&uuid={uuid}'
        else:
            download_url = f'https://drive.usercontent.google.com/download?id={file_id}&export=download&confirm={confirm}'

        response = session.get(download_url, timeout=120)

    apk_data = response.content

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )

    s3.put_object(
        Bucket='files',
        Key='app/app-release.apk',
        Body=apk_data,
        ContentType='application/vnd.android.package-archive',
        ContentDisposition='attachment; filename="app-release.apk"'
    )

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/app/app-release.apk"

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'url': cdn_url, 'size_bytes': len(apk_data)})
    }
