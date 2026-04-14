import os
import boto3
import requests

def handler(event: dict, context) -> dict:
    """Скачивает APK с Google Drive и загружает в S3 хранилище проекта."""
    
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    file_id = '1P9gYPUsPiU1r8j84Dpl2iGeYYbUnAJf3'
    download_url = f'https://drive.google.com/uc?export=download&id={file_id}&confirm=t'

    session = requests.Session()
    response = session.get(download_url, stream=True, timeout=60)
    response.raise_for_status()

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
        'body': f'{{"success": true, "url": "{cdn_url}"}}'
    }
