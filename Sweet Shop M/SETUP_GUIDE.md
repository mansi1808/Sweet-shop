# Backend Setup Guide: Installing Maven

The error `mvn : The term 'mvn' is not recognized` indicates that Maven is either not installed or not added to your system's PATH environment variable. Follow these steps to fix it:

## 1. Download Maven
1. Go to the [Apache Maven Download page](https://maven.apache.org/download.cgi).
2. Download the **Binary zip archive** (e.g., `apache-maven-3.9.6-bin.zip`).

## 2. Install Maven
1. Extract the zip file to a directory of your choice (e.g., `C:\Program Files\Apache\maven`).

## 3. Configure Environment Variables
1. Press `Win + S` and search for **"Edit the system environment variables"**.
2. Click on **"Environment Variables..."**.
3. Under **System variables**, click **New...** to create a `MAVEN_HOME` variable:
   - **Variable name**: `MAVEN_HOME`
   - **Variable value**: The path to your extracted Maven folder (e.g., `C:\Program Files\Apache\maven\apache-maven-3.9.6`).
4. Find the `Path` variable under **System variables** and click **Edit...**.
5. Click **New** and add `%MAVEN_HOME%\bin`.
6. Click **OK** on all dialogs to save.

## 4. Verify Installation
1. Open a **new** terminal (PowerShell or Command Prompt).
2. Run the following command:
   ```powershell
   mvn -version
   ```
3. You should see output displaying the Maven version, Java version, and OS information.

## 5. Run the Backend
Once Maven is set up, you can run the backend from the `Sweet-Shop-Backend` directory:
```powershell
mvn spring-boot:run
```
