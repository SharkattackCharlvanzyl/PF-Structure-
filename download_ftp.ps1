param(
    [string]$fileName,
    [string]$remotePath = "/"
)

$basePath = if ($remotePath -eq "/") { "ftp://property-finder.co.za" } else { "ftp://property-finder.co.za$remotePath" }
$remotePath = $remotePath.TrimEnd('/')
$ftpUri = "$basePath/$fileName"
$username = "charl@property-finder.co.za"
$password = "Texas@450"
$localPath = "c:\Users\Charl van Zyl\AppData\Local\Temp\pf-next\html-originals\$fileName"

$ftpRequest = [System.Net.FtpWebRequest]::Create($ftpUri)
$ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::DownloadFile
$ftpRequest.Credentials = New-Object System.Net.NetworkCredential($username, $password)

try {
    $ftpResponse = $ftpRequest.GetResponse()
    $responseStream = $ftpResponse.GetResponseStream()
    $localFileStream = [System.IO.File]::Create($localPath)
    $responseStream.CopyTo($localFileStream)
    $localFileStream.Close()
    $responseStream.Close()
    $ftpResponse.Close()
    Write-Host "Downloaded $fileName successfully"
} catch {
    Write-Host "Error downloading $fileName : $($_.Exception.Message)"
}