

async function election(hostUrl) {
    const url = `${hostUrl}/raftControl/election`
    const init = {
        request: "POST"
    }

    const response = await fetch(url, init);
    console.log(response);

}

async function setLatency(hostUrl, ip, latency) {
    const url = `${hostUrl}/raftControl/latency?ip=${ip}&latency=${latency}`
    const init = {
        request: "POST"
    }

    const response = await fetch(url, init);
    console.log(response);
}

async function shutdown(hostUrl) {
    const url = `${hostUrl}/raftControl/shutdown`
    const init = {
        request: "POST"
    }

    const response = await fetch(url, init);
    console.log(response);
}