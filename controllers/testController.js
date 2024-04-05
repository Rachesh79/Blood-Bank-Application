const testController = (req,res) => {
    res.status(200).send({
        message:"Hello User",
        success: true,
    })
}

module.exports = {testController}
