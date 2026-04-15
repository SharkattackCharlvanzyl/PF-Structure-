$files = @(
    'ad-preview-guide.html',
    'admin-dashboard.html',
    'admin-invoices.html',
    'advertise.html',
    'agr-live.html',
    'anti-fraud-bid-integrity.html',
    'business (4).html',
    'buy-farm.html',
    'copyright-ip.html',
    'floating-toolbar.html',
    'listing-agreement-agency.html',
    'listing-agreement-enterprise.html',
    'listing-agreement-private.html',
    'login.html',
    'payment-cancel.html',
    'payment-success-full.html',
    'payment-success.html',
    'popular-searches-embed.html',
    'popular-searches.html',
    'pricing.html',
    'private-seller-listing-agreement.html',
    'propertyfinder-features (2).html',
    'propertyfinder-features.html',
    'proval.html',
    'ps-live.html',
    'ps-pv.html',
    'ps-test.html',
    'pv-live.html',
    'pv-pdf-test.html',
    'seller-agent-listing.html',
    'user-dashboard.html'
)

foreach ($file in $files) {
    Write-Host "Downloading $file"
    .\download_ftp.ps1 -fileName $file
}
