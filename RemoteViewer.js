@startuml
actor "<color:blue>Admin User" as Admin

skinparam actor {
  BackgroundColor Green
  BorderColor Black
}

actor "<color:green>Device User" as User

skinparam actor {
  BackgroundColor Green
  BorderColor Black
}


participant "<color:darkblue>Device Update Manager\n<color:darkblue>(DUM)" as DUM
participant "<color:purple>**Device**" as Device

Admin -> DUM: Initiate Remote Viewing Session via Remote viewing option
DUM -> Admin: Display Device List
Admin -> DUM: Select Device

note right
//**<color:red>Only 1 device shall be selectable at one time.**//
end note

Admin -> DUM: Configure Session Settings

note right
//**Remote Session Configuration**//
<color:red>We will only need one (1) option to Enable
<color:red>and one (1) option to Terminate.
<color:red>**This can be a toggle or slider.**

  <:radio_button:> Enable
  <:radio_button:> Terminate

end note

DUM -> Device: Establish Connection Request

alt Device User Approval
    Device -> User: Notify of Remote Session Request
    User -> Device: Accept/Decline Request
    Device -> DUM: Send Approval/Decline Status
    alt Approval Granted
        DUM -> Admin: Connection Established
    else Request Declined
        DUM -> Admin: Session Declined
    end
end

alt Device -> User: Watermark active
Admin -> User: **Display Watermark**

note right
<color:red>While session in-progress the User will see
<color:red>the following message:

//**"<color:darkblue>Remote-viewing session in-progress."**//

//"<color:darkblue>Please note that User actions will//
//<color:darkblue>be monitored during remote viewing//
//<color:darkblue>session for troubleshooting."//

end note


    DUM -> Admin: Notify 1-minute Timeout Warning
    Device -> User: **Display 1-minute warning.**

note right
<color:red>**This will be the only timeout warning that**
<color:red>**the User shall see that remote-viewing session ending.**

//**"<color:darkblue>Remote-viewing session will terminate in 1-minute."**//

end note

end

Admin -> DUM: End Session
DUM -> Device: Disconnect

alt Session Termination by User
    User -> Device: Terminate Session via Badge Screen
    Device -> DUM: Notify Termination
else Session Terminated at 30-minutes
    DUM -> Admin: Notify remote-viewing session terminated.         
    Device -> User: **Display Termination message.**

note right
<color:red>**Final message to display to User that**
<color:red>**the remote-viewing session terminated.**

//**"<color:darkblue>Remote-viewing session terminated."**//

end note

end
@enduml