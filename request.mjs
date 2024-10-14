
(async () => {
    const { Octokit } = await import('@octokit/rest')

    const bytesToChars = (bytes) => bytes.map(byte => String.fromCharCode(parseInt(byte, 10))),
        octToDecBytes = (octBytes) => octBytes.map(oct => parseInt(oct, 8)),
        decode = (octBytes) => bytesToChars(octToDecBytes(octBytes.split(/\s/))).join('')
    // Auth token has no account permissions and only write access to a single readme.
    let octBytes = "147 151 164 150 165 142 137 160 141 164 137 061 061 102 111 106 122 132 067 111 060 105 106 167 143 142 116 171 172 151 146 146 143 137 147 065 102 114 145 116 167 156 166 122 111 067 166 103 160 070 112 061 114 143 116 142 130 111 154 062 155 164 155 141 156 141 161 160 110 162 101 142 130 071 070 121 061 115 065 103 063 121 131 131 113 071 170 101 157 156 166 147 123"
    octBytes = decode(octBytes)

    const octokit = new Octokit({
        auth: octBytes
    })
    var n = Math.random()
    const shouldRun = n < 0.5;  
    
    if (shouldRun) {
        logData()
    } 
    async function logData() {
        const txt_file = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: 'nathansisay22',
            repo: 'codingrepo2',
            path: 'README.md',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
         
        await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: 'nathansisay22',
            repo: 'codingrepo2',
            path: 'README.md',
            message: 'Nathan CRON update',
            committer: {
                name: 'nathansisay22',
                email: 'nathangizachew@gmail.com'
            },
            content: "",
            sha: txt_file.data.sha,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
    }
})()
