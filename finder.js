
        var selectedButton = null;
        var firstClick = null;
        var selectIcon = function (button)
        {
            let d = new Date();
            if((firstClick-d.getTime()) < 50)
                firstClick = d.getTime();
            if(selectedButton != null)
            {
                $(selectedButton).removeClass('btn-primary');
                $(selectedButton).addClass('btn-light');
            }
            selectedButton = button;
            $(selectedButton).removeClass('btn-light');
            $(selectedButton).addClass('btn-primary');
        }

        var openFilePath = function(filePath)
        {
            let d = new Date();
            if((firstClick-d.getTime()) < 50)
            {
                fetch("/files"+filePath.trim()).then(resp => {
                    if(filePath.trim().length > 0 && filePath.substring(filePath.lastIndexOf("/")).includes('.'))
                        return resp.blob();
                    else
                        return resp.json();
                }).then(convertedValue => {
                    if(filePath.trim().length > 0 && filePath.substring(filePath.lastIndexOf("/")).includes('.'))
                    {
                        var url = window.URL.createObjectURL(convertedValue);
                        var a = document.createElement('a');
                        a.href = url;
                        a.download = filePath.substring(filePath.lastIndexOf("/")+1);
                        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                        a.click();    
                        a.remove()
                    }
                    else
                    {
                        $("#fileFolerContents")[0].innerHTML = '';
                        console.log(filePath.lastIndexOf('/'));
                        if(filePath.substring(filePath.indexOf('/')).trim().length > 0)
                        {
                            let newDiv = document.createElement("div");
                            newDiv.innerHTML = fileFolderContentsStart+(filePath.substring(0,filePath.lastIndexOf('/')).trim()).replace("//","/")+fileFolderContentsMiddle+'Go Back'+fileFolderContentsEnd;
                            $("#fileFolerContents")[0].appendChild(newDiv.firstChild);
                        }
                        convertedValue.forEach(item => {
                        let newDiv = document.createElement("div");
                        newDiv.innerHTML = fileFolderContentsStart+(filePath.trim()+"/"+encodeURI(item).replace("#","%23")).replace("//","/")+fileFolderContentsMiddle+item+fileFolderContentsEnd;
                        $("#fileFolerContents")[0].appendChild(newDiv.firstChild);
                        });
                    }
                });
            }
        }

        var fileFolderContentsStart = "<a onclick='selectIcon(this)' ondblclick='openFilePath(\"";
        var fileFolderContentsMiddle = "\")'  class='d-block text-center btn btn-light col-2'><img src='file-icon.png' height='90px' class='rounded m-auto d-flex' /><div class='text-center'>";
        var fileFolderContentsEnd = "</div></a>";
