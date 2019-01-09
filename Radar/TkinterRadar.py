# encoding=utf8 
import serial, time, math, sys, random, tkinter, os, serial.tools.list_ports, traceback#, gtk
#from gi.repository import gtk
#from Tkinter import *

try:

    port = "COM8"
    baud = 115200
    #s = None

    if os.name == 'nt':  # sys.platform == 'win32':
        from serial.tools.list_ports_windows import comports
    elif os.name == 'posix':
        from serial.tools.list_ports_posix import comports

    green = '#00ff00'

    root = tkinter.Tk()

##    print("Portfunktion/tkinterstart")
##    print(str(e))
##    raw_input("Press Enter to Continue")

    def getPorts():
        objComPorts = comports()#include_links=True)
        listComports = list()
        for el in objComPorts:
            listComports.append(el.device)
        return listComports

    def datenAbrufen(s):
        
        # Loop until the user clicks the close button.
        done = False

        try:
            lines = list()
            hindernis = list()
            while not done:
                data = reciveData(s)
                print(data)

                # Anzahl Messwerte kuerzen
                lines = lines[0:39]
                hindernis = hindernis[0:39]
                #Sensorstrahlen berechnen
                winkel = data["winkel"]
                lines.insert(0,[size[0]/2,size[1]-1.5*fontsize,size[0]/2+radarRadius*math.cos(math.radians(winkel)),size[1]-1.5*fontsize-radarRadius*math.sin(math.radians(winkel))])
                #Hindernis erzeugen 
                if data["distance"] < 51:
                    distanz = data["distance"] * segmentweite/10 + 0.5*segmentweite
                    lines[0][2] = size[0]/2+distanz*math.cos(math.radians(winkel))
                    lines[0][3] = size[1]-1.5*fontsize-distanz*math.sin(math.radians(winkel))
                    hindernis.insert(0,[size[0]/2+distanz*math.cos(math.radians(winkel)),size[1]-1.5*fontsize-distanz*math.sin(math.radians(winkel)),  size[0]/2+radarRadius*math.cos(math.radians(winkel)),size[1]-1.5*fontsize-radarRadius*math.sin(math.radians(winkel))])
                else:
                    hindernis.insert(0,None)

                embedCanvas.delete("all")
                
                drawSensorLines(lines, hindernis)
                
                drawRadar(radien, entfernungen, radarRadius, {"x":size[0]/2,"y":size[1]-1.5*fontsize}, fontsize)

                #pygame.draw.rect(screen, (0,0,0), [0,size[1]-1.5*fontsize+2, size[0], 1.5*fontsize+2])

                writeBottomInformation(data)            
             
                # --- Go ahead and update the screen with what we've drawn. 
                #pygame.display.flip()
                root.update()
                #print("drawComplete")
                

        finally:
            pass
            #s.close()

    
    def reciveData(s):
        data = s.readline().rstrip().split(";")
        #print data
        return {"winkel":int(data[0]),"distance":int(data[1])}

    def getPortsFkt():
        portOptionen = getPorts()
        portOptionen.insert(0, "")
        return portOptionen

    
    
    options = getPortsFkt()

    #size = (768, int(0.60*768)) #fix
    #size = (gtk.gdk.screen_width(), int(0.60*gtk.gdk.screen_width()))#gtk
    #size = (root.winfo_screenwidth(), int(0.60*root.winfo_screenwidth()))#tkinter fix width/height
    size = (root.winfo_screenwidth(), int(0.60*root.winfo_screenwidth()))
    menu = tkinter.Frame(root, width = size[0], height = 50)
    menu.pack(padx=2,pady=2,fill=tkinter.X)#

    variable = tkinter.StringVar(menu)
    variable.set(options[0])

    def refresh():
        variable.set('')
        om['menu'].delete(0,'end')

        new_choices = getPortsFkt()
        for choice in new_choices:
            om['menu'].add_command(label=choice, command=tkinter._setit(variable, choice))

    om = tkinter.OptionMenu(menu, variable, *options)
    om.pack()

    ub = tkinter.Button(menu, text="aktualisieren",command=refresh)
    ub.pack()

    def setSockel():
        if variable.get() != "":
            s = serial.Serial(variable.get())
            s.baudrate = baud
            s.parity = serial.PARITY_NONE
            s.databit = serial.EIGHTBITS
            s.stopbits = serial.STOPBITS_ONE
            
            #print(str(s))
            datenAbrufen(s)


    cb = tkinter.Button(menu, text = "verbinden", command = setSockel)
    cb.pack()

    embed = tkinter.Frame(root, width = size[0],bg='black')
    embed.pack(fill=tkinter.BOTH,padx=2,pady=2,expand=1)




    print("vorLoop")

    root.mainloop()

except Exception as ee:
    print("main")
    #traceback.print_exception(ee)
    traceback.print_exc()#eption(sys.exc_info())
    input("Press Enter to Continue")





