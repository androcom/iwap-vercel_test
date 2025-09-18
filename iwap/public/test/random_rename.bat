@echo off
setlocal enabledelayedexpansion

rem --- ���� ---
set "prefix=image"  :: �� ���� �̸��� ���λ�
set "counter=1"     :: ���� ��ȣ
rem ------------

rem ������ �ӽ� ������ ������ �̸����� �ӽ� ���� ��� ����
set "tempFile=%TEMP%\%~n0_%RANDOM%.tmp"

rem ��ũ��Ʈ �ڽ��� ������ ������ �ִ��� Ȯ��
dir /b /a-d | findstr /v /i /c:"%~nx0" > nul
if errorlevel 1 (
    echo ������ ������ �����ϴ�.
    goto :cleanup
)

echo ���� ����� �����ϰ� �������� ���� ���Դϴ�...

rem 1. �ӽ� ���Ͽ� "��������;���ϸ�" ���·� ���� (�ӽ� ������ ����)
> "%tempFile%" (
    for /f "delims=" %%F in ('dir /b /a-d *.* ^| findstr /v /i /c:"%~nx0"') do (
        set "randomNumber=!RANDOM!"
        echo !randomNumber!;%%F
    )
)

echo ���� �̸� ������ �����մϴ�...
echo.

rem 2. ���� ���ڸ� �������� ���ĵ� �ӽ� ������ �о� ������� �̸� ����
for /f "usebackq tokens=2 delims=;" %%F in (`sort "%tempFile%"`) do (
    rem 3�ڸ� ���ڷ� ����� (��: 1 -> 001, 10 -> 010, 100 -> 100)
    set "paddedCounter=00!counter!"
    set "paddedCounter=!paddedCounter:~-3!"

    rem Ȯ���ڸ� �����Ͽ� �̸� ����
    ren "%%F" "!prefix!!paddedCounter!%%~xF"
    echo "%%F"  --^>  "!prefix!!paddedCounter!%%~xF"

    set /a counter+=1
)

echo.
echo �۾��� �Ϸ�Ǿ����ϴ�.

:cleanup
rem 3. �ӽ� ���� ����
if exist "%tempFile%" del "%tempFile%"

pause